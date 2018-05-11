# Change Log

## `4.0.1` (2018-05-11)

Fix an issue with duplicating status bar items. Items now hide and dispose properly.

## `4.0.0` (2018-05-09)

- Switch to using `registerTextEditorCommand` for the *Insert Current Week Number* command, which is much better suited
- Contribute two configuration settings:
  - `weekNumber.weekWord` to allow customizing the week word shown (for localization, default `null` - try to infer using `env.language` and fallback to `Week`, empty string for just the number)
  - `weekNumber.statusBarAlignment` to allow customizing whether the week number goes to the left or to the right (default `left`)
- Listen for configuration changes and refresh in-place without the need for a reload
- Refresh the week number every hour

## `3.0.0` (2018-05-01)

Switch to a new, ISO-8601 compliant algorithm from https://www.epochconverter.com/weeknumbers.
(Weeks now start on Monday.)

## `2.0.0` (2018-04-20)

Implement a command for inserting the current week number to the document.

## `1.0.0` (2018-04-19)

- Initial release, displays a week number in the status bar.
