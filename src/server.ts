import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import bookRoutes from './routes/bookRoutes';
import memberRoutes from './routes/memberRoutes';
import borrowRoutes from './routes/borrowRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/books', bookRoutes);
app.use('/members', memberRoutes);
app.use('/', borrowRoutes);
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
