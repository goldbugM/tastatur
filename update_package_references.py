#!/usr/bin/env python3
"""
Script to update all package references from @mkboard/* to @mkboard/*
"""

import os
import json
import re
from pathlib import Path

def update_package_json_files():
    """Update all package.json files to use @mkboard/* instead of @mkboard/*"""
    
    base_dir = Path.cwd()
    print(f"Updating package references in: {base_dir}")
    
    updated_files = 0
    
    # Find all package.json files
    for package_json_path in base_dir.rglob("package.json"):
        try:
            with open(package_json_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Replace @mkboard/ with @mkboard/ in the content
            content = re.sub(r'"@mkboard/', '"@mkboard/', content)
            content = re.sub(r"'@mkboard/", "'@mkboard/", content)
            
            # Also update any import statements or references
            content = re.sub(r'@mkboard/', '@mkboard/', content)
            
            if content != original_content:
                with open(package_json_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated: {package_json_path.relative_to(base_dir)}")
                updated_files += 1
            
        except Exception as e:
            print(f"Error updating {package_json_path}: {e}")
    
    return updated_files

def update_typescript_config_files():
    """Update tsconfig.json files"""
    
    base_dir = Path.cwd()
    updated_files = 0
    
    # Find all tsconfig.json files
    for tsconfig_path in base_dir.rglob("tsconfig.json"):
        try:
            with open(tsconfig_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Replace @mkboard/ with @mkboard/ in the content
            content = re.sub(r'"@mkboard/', '"@mkboard/', content)
            content = re.sub(r"'@mkboard/", "'@mkboard/", content)
            content = re.sub(r'@mkboard/', '@mkboard/', content)
            
            if content != original_content:
                with open(tsconfig_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated: {tsconfig_path.relative_to(base_dir)}")
                updated_files += 1
            
        except Exception as e:
            print(f"Error updating {tsconfig_path}: {e}")
    
    return updated_files

def update_other_config_files():
    """Update other configuration files"""
    
    base_dir = Path.cwd()
    updated_files = 0
    
    # Files to update
    config_files = [
        "eslint.config.js",
        ".prettierignore",
        "docker-compose.yaml",
        "root/package.json",
        "scripts/package.json"
    ]
    
    for config_file in config_files:
        config_path = base_dir / config_file
        if config_path.exists():
            try:
                with open(config_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                
                # Replace @mkboard/ with @mkboard/
                content = re.sub(r'@mkboard/', '@mkboard/', content)
                content = re.sub(r'"@mkboard/', '"@mkboard/', content)
                content = re.sub(r"'@mkboard/", "'@mkboard/", content)
                
                # Also update keybr references in paths and names
                content = re.sub(r'packages/mkboard-', 'packages/mkboard-', content)
                content = re.sub(r'eslint-plugin-mkboard', 'eslint-plugin-mkboard', content)
                
                if content != original_content:
                    with open(config_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated: {config_path.relative_to(base_dir)}")
                    updated_files += 1
                
            except Exception as e:
                print(f"Error updating {config_path}: {e}")
    
    return updated_files

def update_source_files():
    """Update TypeScript and JavaScript source files"""
    
    base_dir = Path.cwd()
    updated_files = 0
    
    # File extensions to process
    extensions = ['.ts', '.tsx', '.js', '.jsx']
    
    for ext in extensions:
        for source_file in base_dir.rglob(f"*{ext}"):
            # Skip node_modules and other irrelevant directories
            if any(part in str(source_file) for part in ['node_modules', '.git', 'dist', 'build']):
                continue
            
            try:
                with open(source_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                
                # Replace import statements
                content = re.sub(r'from "@mkboard/', 'from "@mkboard/', content)
                content = re.sub(r'import\s*\(\s*"@mkboard/', 'import("@mkboard/', content)
                content = re.sub(r"from '@mkboard/", "from '@mkboard/", content)
                content = re.sub(r"import\s*\(\s*'@mkboard/", "import('@mkboard/", content)
                
                # Replace require statements
                content = re.sub(r'require\s*\(\s*"@mkboard/', 'require("@mkboard/', content)
                content = re.sub(r"require\s*\(\s*'@mkboard/", "require('@mkboard/", content)
                
                if content != original_content:
                    with open(source_file, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated: {source_file.relative_to(base_dir)}")
                    updated_files += 1
                
            except Exception as e:
                print(f"Error updating {source_file}: {e}")
    
    return updated_files

def main():
    """Main function"""
    print("Starting package reference update process...")
    
    total_updated = 0
    
    print("\n1. Updating package.json files...")
    total_updated += update_package_json_files()
    
    print("\n2. Updating tsconfig.json files...")
    total_updated += update_typescript_config_files()
    
    print("\n3. Updating other configuration files...")
    total_updated += update_other_config_files()
    
    print("\n4. Updating source files...")
    total_updated += update_source_files()
    
    print(f"\nUpdate process completed. Total files updated: {total_updated}")

if __name__ == "__main__":
    main()