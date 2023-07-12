# ddb_observeGameLog
![ddbo.png](ddbo.png)

A Symbiote to watch the D&D Beyond Game Log from a Campaign and report the rolls into TaleSpire. This was made
for groups who may not have all members within TaleSpire - to allow folks to roll within D&D Beyond and still
have the results ported to where those in TaleSpire can see the result in the in software chat log.

# Loading into TaleSpire
Use the in-game mod browser to install "D&D Beyond Game Log Oberserver". Should have `PanoramicPanda's` in the logo 😁. For
install instructions on how to get to the Mod Browser, see the official docs here - [https://symbiote-docs.talespire.com/user_docs.html](https://symbiote-docs.talespire.com/user_docs.html).

# Usage
When loaded up, the Symbiote will first load onto a landing page to tell you some of the common issues,
pitfalls, and usage instructions. Clicking the button will attempt to load directly to https://www.dndbeyond.com/my-campaigns.
You'll likely need to login, and perhaps prove you're human to D&D Beyond.
You can then navigate to the campaign you wish to observe and open up the Game Log.

![examples/game_log.png](example_images/game_log.png)

Once the Game Log is opened, that's it! Any roll in made in D&D Beyond within that campaign will now report out to
the TaleSpire Chat Log. The Symbiote even has permission to run in the background and will not need to stay open on
your screen in order to report, so long as you don't close it from running overall.

You'll know when it's detected properly when the **Game Log takes up the full Symbiote** and goes into **Dark Mode**.

# Having Issues?
##  It's not letting me log in.
Symbiotes are currently being detected as a not supported browser by some login methods. They also do not support pop-up logins such as Google. Logging in with a Wizard's account seems to be the most successful way at the moment. This will hopefully be resolved in the future.

## I clicked the Game Log button, but it's still not working!
Are you on the correct page? This only works on the main campaign page for your D&D Beyond campaign (The one where you see all the characters in the campaign). This is intentional.

Try clicking somewhere else on the page other than the Game Log and click the Game Log button again. Sometimes it will not load correctly if D&D Beyond has not finished loading the Game Log in the background when you get to your campaign page.

## I accidentally clicked on the wrong campaign page Game Log and now there are no links on the page. How do I go back to find the right one?

Just use the navigation controls in the top right of the symbiote panel. You will see controls for Back, Refresh, and Forward. Refresh the page or go back.

# Examples
## Natural 1
![example_images/ddb_ss.png](example_images/ddb_ss.png)
![example_images/ts_ss.png](example_images/ts_ss.png)
## Natural 20
![example_images/ddb_int.png](example_images/ddb_int.png)
![example_images/ts_int.png](example_images/ts_int.png)
## Lots o' Dice
![example_images/ddb_fireball.png](example_images/ddb_fireball.png)
![example_images/ts_fireball.png](example_images/ts_fireball.png)
