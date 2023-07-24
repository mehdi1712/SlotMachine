export default function useRandom() {

    function getRandomInt(min: number, max: number) {

        // this function get random number bet 2 input params
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    function getChancePercentage(channce: number) {
        // this function get chance , we calculate this chance with 1-10 range random number

        const limitRange = channce * 10 / 100
        const randomNumber = getRandomInt(1, 10)

        if ((0 < randomNumber) && (randomNumber <= limitRange)) return true

        else false

    }



    return {
        getRandomInt,
        getChancePercentage
    };
}