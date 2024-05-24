import { useContext, useEffect } from 'react';
import './Home.css'
import Card from '../Card/Card';
import Context from '../../components/Context/Context';

const Home = ({ data }) => {
    const { liked, setLiked } = useContext(Context);
    useEffect(() => {
      const storedLiked = JSON.parse(localStorage.getItem('liked'));
      if (storedLiked) {
        setLiked(storedLiked);
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem('liked', JSON.stringify(liked));
    }, [liked]);
  

  return (
    <div className='cardsDisplay'>
        {data.length === 0 ? (
        <h1>No data found</h1>
      ) : (
        data.map((item) => (
          <Card
            key={item.image}
            data={item}
            liked={liked}
            setLiked={setLiked}
          />
        ))
      )}
    </div>
  )
}

export default Home