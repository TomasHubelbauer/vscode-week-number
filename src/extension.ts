'use strict';
import { StatusBarAlignment, window, ExtensionContext, commands, workspace } from 'vscode';

export function activate(context: ExtensionContext) {
    const instant = new Date();
    instant.setUTCDate(instant.getUTCDate() + 4 - (instant.getUTCDay() || 7));
    const weekNumber = Math.ceil((((Date.now() - new Date(Date.UTC(new Date().getUTCFullYear(), 0, 1)).getTime()) / 86400000) + 1) / 7);

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
