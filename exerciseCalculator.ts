interface Exercise {
    periodLength: number;
    trainingDays: number;
    average: number;
    target: number;
    success: boolean;
    rating: number;
    ratingDescription: string
}

const parseArguments1 = (args: Array<string>): number[] => {
    if (args.length < 4) throw new Error('Not enough arguments');
    var arr: number[] = []
    let i = 2
    var flag = 0
    while (process.argv[i]) {
        if (isNaN(Number(args[i]))) {
            flag = flag + 1
        }
        arr[i - 2] = Number(process.argv[i])
        i = i + 1

    }
    if (flag == 0) {
        return arr
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateExercise = (a: number[]): Exercise => {
    var len = 0
    var avg = 0
    var tar = 2
    var s = false
    var r = 1
    var des = ''
    var i = 0
    var x = 0

    len = a.length - 1
    avg = (a.reduce(function (a, b) { return a + b }, 0) - a[0]) / (len)
    tar = a[0]
    i = 1

    for (let index = i; index < a.length; index++) {
        if (a[index] > 0) {
            x = x + 1
        }
    }

    if (avg > tar) {
        s = true
        r = 3
        des = 'well done'
    }
    else if (avg > tar - 1) {
        s = false
        r = 2
        des = 'can do better'
    }
    else {
        s = false
        r = 1
        des = 'need to work a lot more'
    }
    return {
        periodLength: len,
        trainingDays: x,
        average: avg,
        target: tar,
        success: s,
        rating: r,
        ratingDescription: des
    }
}



try {
    const arr: number[] = parseArguments1(process.argv);
    console.log(calculateExercise(arr));
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}

export { calculateExercise }