import React, { useEffect, useState } from 'react';
import { getLatestSulimbang } from '../../pages/publications/sulimbang.astro';
import { urlForImage } from '../../utils/imageHelper';

const LatestSulimbang = () => {
  const [latestsulimbang, setLatestsulimbang] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLatestSulimbang();
        setLatestsulimbang(data);
      } catch (error) {
        console.error('Failed to fetch latest Sulimbang:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <img
        src={
          latestsulimbang
            ? urlForImage(latestsulimbang.mainImage.asset.url).url()
            : '/images/placeholder.png'
        }
        alt={latestsulimbang ? latestsulimbang.title : 'Placeholder'}
      />
      <h4>{latestsulimbang ? latestsulimbang.title : 'Latest publication coming soon!'}</h4>
    </div>
  );
};

export default LatestSulimbang;
