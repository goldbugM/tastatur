#!/usr/bin/env bash

if [[ "$(id -u)" != "0" ]]; then
    echo "This script must be run as root." 1>&2
    exit 1
fi

mkdir -p /etc/mkboard

chown -R root:root /etc/mkboard

mkdir -p /var/lib/mkboard
mkdir -p /var/lib/mkboard/backups
mkdir -p /var/lib/mkboard/sessions
mkdir -p /var/lib/mkboard/user_settings
mkdir -p /var/lib/mkboard/user_stats

chown -R www-data:www-data /var/lib/mkboard
chmod -R u=rwX,g=rX,o=rX /var/lib/mkboard
