import ShowNews from '../components/ShowNews';


const Home = ({ socket }: any) => {
    return (
        <>
            <ShowNews socket={socket} />
        </>
    )
}

export default Home