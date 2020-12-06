import app from './app';
//Server Start
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});