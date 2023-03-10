CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Requirements
 * Installation
 * Configuration
 * Maintainers

INTRODUCTION
------------

This is a simple module which can be used to insert a soft hyphen ```(&shy;)``` into the content using the provided button.
During content creation, the author may add a soft hyphen ```(&shy;)``` to break words across lines.
Soft hyphen is an invisible character.

REQUIREMENTS
------------

This module requires the following core modules:

 * editor
 * ckeditor

INSTALLATION
------------

Install the module then follow the instructions for installing the CKEditor plugins below. The recommended way to install this module is via Composer.

CONFIGURATION
-------------

Go to the 'Text formats and editors' configuration page: /admin/config/content/formats, and for each text format/editor combo where you want to use SHY, do the following:

 * Drag and drop the 'SHY' button into the Active toolbar.
 * Enable filter "Cleanup SHY markup".
 * If the "Limit allowed HTML tags and correct faulty HTML" filter is disabled you dont have anything to do with this text format. Otherwise, add the tag <shy> in the "allowed HTML tags" field.

MAINTAINERS
-----------

Current maintainers:
 * Ivan Trokhanenko (i-trokhanenko) - https://www.drupal.org/u/i-trokhanenko

This project has been sponsored by:
 * RockSolid PSF - https://www.drupal.org/rocksolid-psf


The module for CKEditor 5 compatibility is inspired by "CKEditor Non-breaking space Plugin" (https://www.drupal.org/project/nbsp), maintained by Kevin Wenger (wengerk) https://www.drupal.org/u/wengerk
