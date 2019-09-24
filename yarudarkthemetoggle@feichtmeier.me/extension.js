'use strict';

const St = imports.gi.St;
const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;

const LABEL_TEXT = 'Toggle dark theme';

const SCHEMA_KEY = 'org.gnome.desktop.interface';
const THEME_KEY = 'gtk-theme';
const LIGHT_THEME = 'Yaru';
const DARK_THEME = 'Yaru-dark';

let button, settings, themes;

function Theme(name, next) {
    this.name = name;
    this.next = next;
}

function init() {
	settings = new Gio.Settings({ schema: SCHEMA_KEY });
    themes = [
        new Theme('Yaru', 'Yaru-dark'),
        new Theme('Yaru-dark', 'Yaru-light'),
        new Theme('Yaru-light', 'Yaru'),
    ];
}

function toggleTheme() {
    const curTheme = settings.get_string(THEME_KEY);
    if (!curTheme || !curTheme.includes('Yaru')) {
        return;
    }

    let theme;
    for (theme of themes) {
        if (!(curTheme === theme.name)) {
            continue;
        }

        settings.set_string(THEME_KEY, theme.next);
    }
}

function enable() {
	button = new PanelMenu.Button(0.0);

	const icon = new St.Icon({
		icon_name: 'weather-clear-night-symbolic',
		style_class: 'system-status-icon'
	});

	button.actor.add_actor(icon);
	button.actor.connect('button-press-event', toggleTheme);
	Main.panel.addToStatusArea('ToggleDarkTheme', button);
}

function disable() {
	button.destroy();
}

