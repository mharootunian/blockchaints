let nonce = 0;

async function generateHash(input: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(input);

    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray.map(b =>
        ('00' + b.toString(16)).slice(-2)).join('');
}

async function calculateHashWithNonce(nonce: number): Promise<string> {
    const data = 'Hello World my name is meero, what is your name, mate?' + nonce;
    return generateHash(data);
}

async function mine(): Promise<void> {
    let hash: string;

    do {
        hash = await calculateHashWithNonce(++nonce);
    } while (hash.startsWith('00000') === false);

    console.log(`Hash: ${hash}, nonce: ${nonce}`);
};

mine();