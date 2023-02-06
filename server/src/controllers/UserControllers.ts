import ModelForUser from "../models/UsersData";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Check user credentials
async function confirmLogin(req: Request, resp: Response) {
    const { user, password } = req.body;
    const secretKey: string | undefined = process.env.SECRET_KEY;

    if (!secretKey) return resp.status(404).json({
        err: "Couldn't find key to encode message",
    })

    const userExist = await ModelForUser.exists({ user, password });

    if (userExist) {
        const { _id } = userExist;
        // Creates a JSON Web Token *1
        const token = jwt.sign({ _id }, secretKey);
        return resp.json({ token: token });
    } else {
        return resp.status(404).json({
            err: "User doesn't exist."
        });
    }
}

// Check that a user exists
async function confirmUser(req: Request, resp: Response) {
    const { token } = req.params;
    const secretKey: string | undefined = process.env.SECRET_KEY;

    if (!secretKey) return resp.status(404).json({
        err: "No secrete key defined in the environment!",
    });

    try {
        // Verify the token
        const decoded = jwt.verify(token, secretKey);
        const userExist = await ModelForUser.exists({ _id: decoded });
        return userExist ? resp.json({ token }) : resp.json({ token : ""});
    } catch (err: any) {
        return resp.status(500).json({
            err: "Couldn't confirm user.",
            message: err.message,
        });
    }
}

export default { confirmLogin, confirmUser };

/*
1 - The JWT is a standard to encode data that should be shared
between systems. For example, the data shared between our server
and the browser.

It consists of three distict sections, separated by a period (.).
In the first section we have the header, in the second there is
the actual information to be shared, and the third section is
where the signature is located. For examploe, this is a JSON
Web Token:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JmOGIzZjc0YTAxNDQ5M2U1YTA3NmIiLCJpYXQiOjE2NzU1NzgzNDN9.4MSwIS__kXfX3__nIqI96KBYdUFbMbzbhMCLD1_C0Jw

Here, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 is the header, followed by the actual data being shared (aka payload) eyJfaWQiOiI2M2JmOGIzZjc0YTAxNDQ5M2U1YTA3NmIiLCJpYXQiOjE2NzU1NzgzNDN9, and then the signature 4MSwIS__kXfX3__nIqI96KBYdUFbMbzbhMCLD1_C0Jw.

The header contain the algorithm (the set of steps) used to 
create the signature, and the type of the token, which is usually jwt.

The algorithm specifies how a thing we call the "secret key" 
got combined to the payload and the header to generate the a string
we call a signature. As in real life the signature is used to 
identify that you are... you, that string is used to make sure
the token under consideration is valid or not. 

For example, we have this signature for the JWT above 
4MSwIS__kXfX3__nIqI96KBYdUFbMbzbhMCLD1_C0Jw. This signature
was created using the HS256 algorithm. This algorithm 
combined the secret key, the header and the payload into 
a single set of characters. Explain the set of steps 
involved in the process carried when using HS256 is 
too much complex to explain here, but there are plenty 
of sources where you can find get deep into the issue.

Now, suppose we send that token to the user's browser, and 
store it there using the window.localStorage() function. 
Any one can use the browser devtools to read information 
from the local storage, thus any one can capture that token 
we stored there.

Ok. Lets pretend someone does that. A mallicious individual 
get the token, and proceedes to try and change its payload
to insert information that would let they get access to 
something that they can't. For example, they cen pretend
to be the IT manager, and then try to get access to 
privileged information.

The token is then modified and sent back to our server.
Our server, smart as it is, retrieves the header, payload
and secrete key from that token, and generates a signature. 
This signature is then compared to that which appears in the 
token. If they does not match, it means that the payload or the header
got modified, so it doesn't accept the token; otherwise,
it proceeds to fullfill the user's request. 

How did the server know that token got tempered just by
comparing the signature in the token with one other it
just generated? Remember how the first token has been built
in the first place. The header, payload and secret key
were combined to generate the signature. If none of these
three value changes, the signature will always be the same.
Once one of them changes, the signaure also changes. It
means that once our attacker modified the token's payload,
the server will no longer generate a signature that is 
equal to that which appears in the token. They won't match.

But the attacker could just change the signature as well, right?
Actually, yes. However, in such case the attacker must 
know the secret key. Why? Because a different key combined to
the payload and the header will generate a different signature.
So, if the server is using the secret key X, and the attacker
sends a token with a signature created using a secret key Y,
the server won't generate a signature that is equal to the
signature added to the token; it will reject the token.

This token doesn't guarantee that our system is safe, though.
As said before, the attacker may have access to the token
stored in the browser. If that token already has the info
necessary to access the target resource (the one the attacker wants so much), 
the attacker does not need to modify it. In this case, they just need
to send the token to the server, which will validate and send back the resource. For
this case, we may set an expiration value to the token.
The expiration determines for how long that token is valid.
Once the token is invalid, it must be replaced by a new one. Old tokens
must be rejected by the server.

Also, it is worth noting that the info in the payload and the header are still
readable by anyone that gain access to it. That means that sensitive information
is still vulnerable. For example, if we store the user's CPF in the payload 
anyone that has the token, has the user's CPF. 

Getting back to our token aforementioned, the payload goes like this 
eyJfaWQiOiI2M2JmOGIzZjc0YTAxNDQ5M2U1YTA3NmIiLCJpYXQiOjE2NzU1NzgzNDN9.
We may agree taht this string is quite unreadable, right? But it is because
it is encoded using base64. There are planty of base64 decoder available
and all of them may decode that payload. Copy and paste that payload
in text box available in this website https://www.base64decode.org/ and
then hit decode. Here is the info you should get 
{"_id":"63bf8b3f74a014493e5a076b","iat":1675578343}. This tells you that
the payload contains a JSON string, with two key/value pairs. One of these
pairs is "_id":"63bf8b3f74a014493e5a076b", which you may presume it is the
identification of the something in a database.

*/