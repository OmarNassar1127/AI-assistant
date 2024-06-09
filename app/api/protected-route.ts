import auth from './middleware/auth';

export default async function protectedRoute(req, res) {
    auth(req, res, () => {
        res.status(200).json({ message: 'This is a protected route', user: req.user });
    });
}
