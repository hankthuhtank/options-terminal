# Build-Time Media Tools

`wikimedia_media.py` searches Wikimedia Commons and prints the exact file title, creator, license, license URL, source page and thumbnail URL before you add media to the repository.

Wikimedia requests should use a descriptive User-Agent with contact information. Set it before running:

```bash
export TRADESCHOOL_USER_AGENT='TradeSchoolMedia/1.0 (https://github.com/YOURNAME/YOURREPO)'
```

Windows PowerShell:

```powershell
$env:TRADESCHOOL_USER_AGENT='TradeSchoolMedia/1.0 (https://github.com/YOURNAME/YOURREPO)'
```

Search:

```bash
python tools/media/wikimedia_media.py search "motor control center" --limit 5
```

Inspect/download an exact Commons file after reviewing the license:

```bash
python tools/media/wikimedia_media.py download "File:Mcc room.jpg" assets/reference/electrical/mcc-room.jpg
```

The script does not modify credits automatically. Add the selected file to `docs/CREDITS.md` after verifying it.
