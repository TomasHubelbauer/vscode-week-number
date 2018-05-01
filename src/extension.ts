'use strict';
import { StatusBarAlignment, window, ExtensionContext, commands } from 'vscode';

export function activate(context: ExtensionContext) {
    // Algorithm from https://www.epochconverter.com/weeknumbers
    const instant = new Date();
    instant.setDate(instant.getDate() - ((instant.getDay() + 6) % 7) + 3);
    const firstThursday = instant.getTime();
    instant.setMonth(0, 1);
    if (instant.getDay() !== 4) {
        instant.setMonth(0, 1 + ((4 - instant.getDay()) + 7) % 7);
    }

    const weekNumber = 1 + Math.ceil((firstThursday - instant.getTime()) / 604800000);

    const statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
    context.subscriptions.push(statusBarItem);

    statusBarItem.text = `Week ${weekNumber}`;
    statusBarItem.show();

    context.subscriptions.push(commands.registerCommand('extension.insertWeekNumber', () => {
        const textEditor = window.activeTextEditor;
        if (textEditor !== undefined) {
            textEditor.edit(editBuilder => {
                editBuilder.insert(textEditor.selection.active, weekNumber.toString());
            });
        }
    }));
}
