![Sonic Blocks Screenshot](https://raw.githubusercontent.com/marianoguerra/sonic-blocks/master/apps/sbs/priv/assets/img/sonic-pi-blocks.png)

A Visual Programming frontend for [Sonic Pi](http://http://sonic-pi.net/)

![Sonic Blocks Screenshot](https://raw.githubusercontent.com/marianoguerra/sonic-blocks/master/apps/sbs/priv/assets/img/sonic-blocks-screenshot.png)

Build
-----

For building and running from source you need to install erlang and rebar3,
check the [Rebar3 website](http://rebar3.org) for rebar3 installation
instructions, if you are on debian or ubuntu:

    sudo apt-get install erlang erlang-dev erlang-eunit
    wget https://s3.amazonaws.com/rebar3/rebar3
    chmod u+x rebar3

You can put it in a folder in your $PATH or inside this repo and run all the
rebar3 commands relative to the current folder (./rebar3 *command*).


then:

    rebar3 compile

Run
---

    rebar3 run

Author
------

Mariano Guerra

Usage
-----

You need to install and run Sonic Pi, for that check the [Sonic Pi Website](http://sonic-pi.net/).

To start just the Sonic Pi server without the user interface you need to run
the server script, on ubuntu run:

    /usr/lib/sonic-pi/server/bin/sonic-pi-server.rb

If you are running in another OS search on the sonic pi installation.

Start the sonic blocks server and open http://localhost:8080/ui/index.html in your browser.

Play with the blocks and click the **Play** Button

Sonic Pi can be running in another computer, for that just change the Host and
Port config in the UI to the host and port where Sonic Pi is running.

Troubleshooting Jack problems on linux
---------------------------------------

If you are trying to run it on linux and have pulseaudio installed read the
following resources to try o make it work:

* http://marianoguerra.org/posts/sonic-pi-on-ubuntu-1604.html
* https://github.com/samaaron/sonic-pi/issues/827
* https://github.com/overtone/overtone/wiki/Installing-and-starting-jack

Experimental Desktop App
------------------------

![Sonic Blocks Desktop Screenshot](https://raw.githubusercontent.com/marianoguerra/sonic-blocks/master/apps/sbs/priv/assets/img/sonic-blocks-desktop-screenshot.png)

This app is just to show how to include sonic blocks in a webview, to use it
you need to install:

* python 3
* PyQt5 and PyQt5 WebKit
* python-osc

On debian/ubuntu:

    sudo apt install python3-pyqt5 python3-pyqt5.qtwebkit
    sudo pip3 install python-osc

Then run:

    python3 sonicblocks.py

Note: you don't need to run the server for this, this app will call sonic pi's
backend directly using python-osc

Technology
----------

Frontend is plain vanilla js, you can find the code at apps/sbs/priv/assets/

The backend runs on top of [Cowboy](https://github.com/ninenines/cowboy), it
uses the [erlang\_osc library](https://hex.pm/packages/erlang_osc) to talk to
Sonic Pi.

The backend is programmed in [efene](http://efene.org) a language for the Erlang VM.

License
-------

There's not much code that's mine, just a glue of other projects, but in case
of my code the license is:

Apache Public License, see LICENSE file for details

