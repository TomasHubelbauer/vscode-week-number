'use strict';
import { StatusBarAlignment, window, ExtensionContext, commands, workspace, StatusBarItem, env } from 'vscode';

let statusBarItem: StatusBarItem;
let weekNumber: number;

export function activate(context: ExtensionContext) {
    context.subscriptions.push(commands.registerTextEditorCommand('extension.insertWeekNumber', (textEditor, edit) => {
        edit.insert(textEditor.selection.active, weekNumber.toString());
    }));

    paint();
    workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('weekNumber')) {
            paint();
        }
    });

    // Update the week number every hour
    setInterval(paint, 1000 * 60 * 60);
}

export function deactivate() {
    if (statusBarItem) {
        statusBarItem.hide();
        statusBarItem.dispose();
    }
}

function paint() {
    if (statusBarItem) {
        statusBarItem.hide();
        statusBarItem.dispose();
    }

    // Algorithm from https://www.epochconverter.com/weeknumbers
    const instant = new Date();
    instant.setDate(instant.getDate() - ((instant.getDay() + 6) % 7) + 3);
    const firstThursday = instant.getTime();
    instant.setMonth(0, 1);
    if (instant.getDay() !== 4) {
        instant.setMonth(0, 1 + ((4 - instant.getDay()) + 7) % 7);
    }

    weekNumber = 1 + Math.ceil((firstThursday - instant.getTime()) / 604800000);

    let { weekWord, statusBarAlignment } = workspace.getConfiguration('weekNumber');
    switch (statusBarAlignment) {
        case "left": statusBarAlignment = StatusBarAlignment.Left; break;
        case "right": statusBarAlignment = StatusBarAlignment.Right; break;
    }

    if (weekWord === null) {
        // TODO: Contribute translations
        switch (env.language) {
            case 'en':
            case 'en-US':
                weekWord = 'Week';
                break;
        }
    }

    statusBarItem = window.createStatusBarItem(statusBarAlignment);
    statusBarItem.text = weekWord !== '' ? `${weekWord} ${weekNumber}` : weekNumber.toString();
    statusBarItem.show();
}
