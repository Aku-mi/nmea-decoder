import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import morgan from 'morgan';

//import Routes
import indexRoutes from './routes'

//Inits
const app = express();
import './database';
import { helper } from './lib/helpers';

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    helpers: helper,
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)

}));

app.set('view engine', '.hbs');
//Middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use('/', indexRoutes);

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

export default app;