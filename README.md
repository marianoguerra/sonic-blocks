![Sonic Blocks Screenshot](https://raw.githubusercontent.com/marianoguerra/sonic-blocks/master/apps/sbs/priv/assets/img/sonic-pi-blocks.png)

A Visual Programming frontend for [Sonic Pi](http://http://sonic-pi.net/)

![Sonic Blocks Screenshot](https://raw.githubusercontent.com/marianoguerra/sonic-blocks/master/apps/sbs/priv/assets/img/sonic-blocks-screenshot.png)

Build
-----

For building and running from source you need to install rebar3, check the
[Rebar3 website](http://rebar3.org) for installation instructions.

    rebar3 compile

Run
---

    rebar3 run

Author
------

Mariano Guerra

Usage
-----

You need to install and run Sonic Pi, for that check the [Sonic Pi Website](http://http://sonic-pi.net/).


Start this server and open http://localhost:8080/ui/index.html in your browser.

play with the blocks and click the *Play* Button

Sonic Pi can be running in another computer, for that just change the Host and
Port config in the UI to the host and port where Sonic Pi is running.

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

