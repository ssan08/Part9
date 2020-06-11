import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    var bmi = calculateBmi(Number(req.query.height), Number(req.query.weight))
    if (bmi == 'error') {
        res.send({
            error: "malformatted parameters"
        })
    }
    else {
        res.send({
            weight: Number(req.query.weight),
            height: Number(req.query.height),
            bmi: bmi
        });

    }

});

app.post('/exercise', (req, res) => {
    var arr: number[] = []
    var flag = 0
    let i = 0
    if (req.body.daily_exercises) {
        while (req.body.daily_exercises[i]) {
            if (isNaN(Number(req.body.daily_exercises[i]))) {
                flag = flag + 1
            }
            i = i + 1
        }
    }

    if (flag != 0 || isNaN(req.body.target)) {
        res.send({
            error: "malformatted parameters"
        })
    }
    else if (!req.body.daily_exercises || req.body.daily_exercises.length == 0 || !req.body.target) {
        res.send({
            error: "parameters missing"
        })

    }
    else {
        arr[0] = req.body.target

        for (let index = 0; index < req.body.daily_exercises.length; index++) {
            arr[index + 1] = req.body.daily_exercises[index]
        }

        res.send(calculateExercise(arr))
    }


})


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});