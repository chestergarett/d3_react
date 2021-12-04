import useData from '../helpers/useData';

const Migrants = () => {
    const data = useData('https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/267eac8b97d161c479d950ffad3ddd5ce2d1f370/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv', 'migrants')
    return(
        <>
        migrants
        </>
    )
}

export default Migrants;