import { useState } from "react";
import server from "./server";

function Transfer() {
    const [sender, setSender] = useState("");
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const setValue = (setter) => (evt) => setter(evt.target.value);

    async function transfer(evt) {
        evt.preventDefault();

        try {
            await server.post(`send`, {
                sender: sender,
                recipient: recipient,
                amount: parseInt(amount),
            });
        } catch (ex) {
            alert(ex.response.data.message);
        }
    }

    return (
        <form className="container transfer" onSubmit={transfer}>
            <h1>Send Transaction</h1>

            <label>
                Sender
                <input
                    placeholder="Type an address, for example: 0x1"
                    value={sender}
                    onChange={setValue(setSender)}
                ></input>
            </label>

            <label>
                Recipient
                <input
                    placeholder="Type an address, for example: 0x2"
                    value={recipient}
                    onChange={setValue(setRecipient)}
                ></input>
            </label>

            <label>
                Send Amount
                <input
                    placeholder="1, 2, 3..."
                    value={amount}
                    onChange={setValue(setAmount)}
                ></input>
            </label>

            <input type="submit" className="button" value="Transfer"/>
        </form>
    );
}

export default Transfer;
