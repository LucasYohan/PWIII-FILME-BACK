import jwt from 'jsonwebtoken';

function verifyJWT(req, res, next) {

    const secret = process.env.SECRET;

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).send({ message: 'Token não informado.' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {

        return res.status(401).send({ message: 'Token inválido.' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {

        return res.status(401).send({ message: 'Token inválido.' });
    }

    jwt.verify(token, secret, (err, decoded) => {

        if (err) {

            return res.status(401).send({ message: 'Usuário não autenticado.' });
        }

        req.infoUser = decoded.infoUser;

        return next();
    });
}

function verifyUserType(requiredType) {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Token não fornecido" });
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, "seu_segredo_super_secreto");

            if (decoded.typeUser !== requiredType) {
                return res.status(403).json({ message: "Acesso negado" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: "Token inválido" });
        }
    };
}


export { verifyJWT, verifyUserType };