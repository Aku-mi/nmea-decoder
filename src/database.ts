import mongoose from 'mongoose';

import { mongodb } from './keys';

mongoose.connect(process.env.MONGODB_URI || mongodb.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('DB conected'))
    .catch(e => console.log(e));