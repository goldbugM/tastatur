#!/usr/bin/env python3
"""
Final script to handle remaining "mkboard" references
"""

import os
import re

def update_file_content(file_path, replacements):
    """Update file content with the given replacements"""
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        original_content = content
        
        # Apply all replacements
        for old_text, new_text in replacements:
            content = content.replace(old_text, new_text)
        
        # Only write if content changed
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error updating {file_path}: {e}")
        return False

def main():
    base_dir = r"c:\Users\mb\Desktop\mkboard.com-master"
    
    # Handle remaining specific files
    specific_updates = [
        # Update import statements in .less files
        ("packages/mkboard-lesson-ui/lib/KeySelector.module.less", [
            ("@import \"@mkboard/widget/lib/index.less\";", "@import \"@mkboard/widget/lib/index.less\";")
        ]),
        ("packages/mkboard-pages-browser/lib/NavMenu.module.less", [
            ("@import \"@mkboard/widget/lib/index.less\";", "@import \"@mkboard/widget/lib/index.less\";")
        ]),
        ("packages/mkboard-theme-designer/lib/design/input/ColorImport.module.less", [
            ("@import \"@mkboard/widget/lib/index.less\";", "@import \"@mkboard/widget/lib/index.less\";")
        ]),
        ("packages/mkboard-pages-browser/lib/themes/ThemeSwitcher.module.less", [
            ("@import \"@mkboard/widget/lib/index.less\";", "@import \"@mkboard/widget/lib/index.less\";")
        ]),
        ("packages/mkboard-pages-browser/lib/entry.less", [
            ("@import \"@mkboard/themes/lib/index.less\";", "@import \"@mkboard/themes/lib/index.less\";")
        ]),
        ("packages/mkboard-content/lib/books/ParagraphPreview.module.less", [
            ("@import \"@mkboard/widget/lib/index.less\";", "@import \"@mkboard/widget/lib/index.less\";")
        ]),
        ("packages/mkboard-pages-shared/lib/UserName.module.less", [
            ("@import \"@mkboard/widget/lib/index.less\";", "@import \"@mkboard/widget/lib/index.less\";")
        ]),
        ("packages/mkboard-lesson-ui/lib/indicators.module.less", [
            ("@import \"@mkboard/widget/lib/index.less\";", "@import \"@mkboard/widget/lib/index.less\";")
        ]),
        ("packages/page-highscores/lib/HighScoresTable.module.less", [
            ("@import \"@mkboard/widget/lib/index.less\";", "@import \"@mkboard/widget/lib/index.less\";")
        ]),
        
        # Update import statements in TypeScript files
        ("packages/mkboard-chart/lib/dist/dist.ts", [
            ("import { Distribution } from \"@mkboard/math\";", "import { Distribution } from \"@mkboard/math\";")
        ]),
        ("packages/mkboard-phonetic-model/lib/builder.ts", [
            ("import { type CodePoint, toCodePoints } from \"@mkboard/unicode\";", "import { type CodePoint, toCodePoints } from \"@mkboard/unicode\";")
        ]),
        ("packages/mkboard-keyboard-io/lib/layoutbuilder.ts", [
            ("} from \"@mkboard/keyboard\";", "} from \"@mkboard/keyboard\";"),
            ("import { isDiacritic } from \"@mkboard/unicode\";", "import { isDiacritic } from \"@mkboard/unicode\";")
        ]),
        ("packages/mkboard-phonetic-model/lib/builder.test.ts", [
            ("import { Language } from \"@mkboard/keyboard\";", "import { Language } from \"@mkboard/keyboard\";")
        ]),
        ("packages/mkboard-keyboard-io/lib/layoutbuilder.test.ts", [
            ("import { KeyCharacters, KeyModifier } from \"@mkboard/keyboard\";", "import { KeyCharacters, KeyModifier } from \"@mkboard/keyboard\";")
        ]),
        
        # Update remaining folder references
        ("packages/mkboard-pages-shared/lib/pages.ts", [
            ("import { defaultLocale } from \"@mkboard/intl\";", "import { defaultLocale } from \"@mkboard/intl\";")
        ]),
        
        # Update Norwegian translation
        ("packages/mkboard-intl/translations/nb.json", [
            ("info@keybr.no", "info@mkboard.no")
        ]),
        
        # Update configuration files
        ("eslint.config.js", [
            ("import keybr from \"@mkboard/scripts/eslint-plugin-mkboard.js\";", "import mkboard from \"@mkboard/scripts/eslint-plugin-mkboard.js\";"),
            ("keybr.configs[\"recommended\"],", "mkboard.configs[\"recommended\"],")
        ]),
        ("docker-compose.yaml", [
            ("keybr:", "mkboard:"),
            ("~/.local/state/keybr", "~/.local/state/mkboard"),
            ("/etc/keybr/env", "/etc/mkboard/env")
        ]),
        (".env", [
            ("~/.local/state/keybr", "~/.local/state/mkboard")
        ]),
        
        # Update development environment
        ("packages/devenv/etc/container/vars.sh", [
            ("MACHINE=keybr.dev", "MACHINE=mkboard.dev")
        ]),
        
        # Update documentation
        ("docs/getting_started.md", [
            ("/etc/keybr/env", "/etc/mkboard/env"),
            ("sudo mkdir -p /etc/keybr", "sudo mkdir -p /etc/mkboard"),
            ("sudo cp .env.example /etc/keybr/env", "sudo cp .env.example /etc/mkboard/env")
        ]),
        ("docs/custom_keyboard.md", [
            ("cd packages/mkboard-generators", "cd packages/mkboard-generators"),
            ("packages/mkboard-keyboard/lib/layout", "packages/mkboard-keyboard/lib/layout"),
            ("packages/mkboard-keyboard-generator/layout", "packages/mkboard-keyboard-generator/layout"),
            ("packages/mkboard-keyboard/lib/layout.ts", "packages/mkboard-keyboard/lib/layout.ts")
        ]),
        ("docs/custom_language.md", [
            ("packages/mkboard-keyboard/lib/language.ts", "packages/mkboard-keyboard/lib/language.ts"),
            ("packages/mkboard-generators/dictionaries", "packages/mkboard-generators/dictionaries"),
            ("npm --workspace packages/mkboard-generators run generate-languages", "npm --workspace packages/mkboard-generators run generate-languages"),
            ("packages/mkboard-phonetic-model/assets", "packages/mkboard-phonetic-model/assets"),
            ("packages/mkboard-content-words/lib/data", "packages/mkboard-content-words/lib/data")
        ]),
        
        # Update symlink reference
        ("root/etc/nginx/sites-enabled/www.mkboard.com.conf", [
            ("../sites-available/www.mkboard.com.conf", "../sites-available/www.mkboard.com.conf")
        ]),
    ]
    
    print("Starting final remaining cleanup...")
    
    updated_count = 0
    
    for file_path, replacements in specific_updates:
        full_path = os.path.join(base_dir, file_path)
        if os.path.exists(full_path):
            if update_file_content(full_path, replacements):
                print(f"Updated: {file_path}")
                updated_count += 1
        else:
            print(f"File not found: {file_path}")
    
    print(f"\nFinal remaining cleanup completed! Updated {updated_count} files.")

if __name__ == "__main__":
    main()