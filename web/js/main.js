import {getPhantom, getPhantomProvider} from "./phantom";
import {getEphemeralPP, getPP} from "./anchor/util/context";
import * as Init from "./anchor/ix/init";
import * as StakeBlue from "./anchor/ix/stake/blue";
import * as StakeGreen from "./anchor/ix/stake/green"
import * as StakeRed from "./anchor/ix/stake/red";
import {getGlobal} from "./anchor/pda/get-global";
import {getPools} from "./anchor/pda/get-pools";

// init phantom
let phantom = null;

export async function main(app, json) {
    console.log(json);
    try {
        // parse json as object
        const parsed = JSON.parse(json);
        // match on sender role
        const sender = parsed.sender;
        // listen for connect
        if (sender === "connect") {
            // get phantom
            phantom = await getPhantom(app);
            if (phantom) {
                // get provider & program
                const pp = getPP(phantom);
                await getGlobal(
                    app,
                    pp.provider,
                    pp.programs
                );
            }
            // or listen for disconnect
        } else if (sender === "disconnect") {
            phantom.windowSolana.disconnect();
            phantom = null;
            app.ports.success.send(
                JSON.stringify(
                    {
                        listener: "global-found-wallet-disconnected"
                    }
                )
            );
            // or admin init
        } else if (sender === "admin-init") {
            // get phantom
            phantom = await getPhantom(app);
            // get provider & program
            const pp = getPP(phantom);
            // invoke rpc
            await Init.ix(
                pp.provider,
                pp.programs.sRgb
            );
            // or user fetch
        } else if (sender === "user-fetch") {
            let pp;
            if (phantom) {
                pp = getPP(
                    phantom
                );
            } else {
                pp = getEphemeralPP(
                );
            }
            const pools = await getPools(
                pp.provider,
                pp.programs
            );
            const user = {
                wallet: pp.provider.wallet.toString(),
                tvl: pools.tvl,
                pools: pools.pools
            };
            app.ports.success.send(
                JSON.stringify(
                    {
                        listener: "user-fetched",
                        more: JSON.stringify(
                            user
                        )
                    }
                )
            );
            // or user stake red
        } else if (sender === "user-stake-red") {
            // get phantom
            phantom = await getPhantom(app);
            // get provider & program
            const pp = getPP(phantom);
            // invoke rpc
            await StakeRed.ix(
                app,
                pp.provider,
                pp.programs
            );
            // or user stake green
        } else if (sender === "user-stake-green") {
            // get phantom
            phantom = await getPhantom(app);
            // get provider & program
            const pp = getPP(phantom);
            // invoke rpc
            await StakeGreen.ix(
                app,
                pp.provider,
                pp.programs
            );
            // or user stake blue
        } else if (sender === "user-stake-blue") {
            // get phantom
            phantom = await getPhantom(app);
            // get provider & program
            const pp = getPP(phantom);
            // invoke rpc
            await StakeBlue.ix(
                app,
                pp.provider,
                pp.programs
            );
            // or throw error
        } else {
            const msg = "invalid role sent to js: " + sender;
            app.ports.exception.send(
                JSON.stringify(
                    {
                        message: msg
                    }
                )
            );
        }
    } catch (error) {
        console.log(error);
        app.ports.exception.send(
            JSON.stringify(
                {
                    message: error.toString()
                }
            )
        );
    }
}

export async function onWalletChange(app) {
    const phantomProvider = getPhantomProvider();
    if (phantomProvider) {
        phantomProvider.on("accountChanged", async () => {
            console.log("wallet changed");
            // fetch state if previously connected
            if (phantom) {
                phantom = await getPhantom(app);
                const pp = getPP(phantom);
                await getGlobal(
                    app,
                    pp.provider,
                    pp.programs
                );
            }
        });
    }
}
