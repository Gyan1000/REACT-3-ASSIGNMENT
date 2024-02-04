import { useEffect, useState } from 'react';
import { PhotoCard } from '../component/PhotoCard';
import axios from 'axios';
import '../style/HomePage.css';

function HomePage() {

	const [slingDataInfo, setSlingDataInfo] = useState({
		info: [],
		isLoding: true,
		offset: 0,
		limit:20,
		slingacademyURL: `https://api.slingacademy.com/v1/sample-data/photos?limit=20`,
		total_photos: 0,
	});
	async function getInfo() {
		try {
			const res = await axios.get(slingDataInfo.slingacademyURL);
			const { photos,total_photos} = res.data;

			setSlingDataInfo({
				...slingDataInfo,
				total_photos:total_photos,
				info: photos,
				isLoding: false,
			});
            console.log('RESPONSE..... ',res.data);

			console.log('Photo..... ',photos);

		} catch (error) {
			console.error('URL DOWNLODING ERROR:', error.message);
		}
	}
	// WHEN YOU CLICK ON NEXT OR PREVIOUS BUTTON slingacademyURL VALUE WILL BE CHANGED AND getinfo method will be called 
	// because in dependency array I HAVE SET slingDataInfo.slingacademyURL
	useEffect(() => {
		getInfo();
	 }, [slingDataInfo.slingacademyURL]);
    
	   
	
	
	 return (
		<div id="superMain">
			<div id="display-btn">

				
			{/* IF OFFSET VALUE=0 THAN PREVIOUS WILL NOT WORK BECAUSE THEN THERE NO NEED TO CALL getIfo() BECAUSE URL WILL NOT CHANGED
			    OTHER WISE DECREMENT THE offset VALUE AND FETCH NEW DATA.
				limit value is 20
			*/}

				<button disabled={(slingDataInfo.offset===0)}
					className="btn"
					onClick={() => {
						const newOffset =
							slingDataInfo.offset >= slingDataInfo.limit ? slingDataInfo.offset - 20 : 0;

						setSlingDataInfo((prevData) => ({
							...prevData,
							slingacademyURL: `https://api.slingacademy.com/v1/sample-data/photos?offset=${newOffset}&limit=20`,
							offset: newOffset,
						}));
					}}
				>
					PREVIOUS
				</button>

				{/* IF newOffset VALUE GREATER THAN 120 THEN SET newOffset VALUE =0 OTHER WISE INCRMENT THE OFFSET VALUE 
				AND FETCH THE DATA
				newOffset=slingDataInfo.offset <slingDataInfo.total_photos-12 (120)? slingDataInfo.offset +20 : 0;

                 BY USING THIS WE CAN DISPLAY ALL(132) PHOTOS ON BROWSER AND IF newOffset VALUE WILL BE MORE THAN 120 THAN ITS 
				 VALUE WILL AGAIN ZERO AND YOU WILL REACH AGAIN ON INITIAL STAGE
				 
				
	            */}

<button className="btn" onClick={() => {
						
						const newOffset =
							slingDataInfo.offset <slingDataInfo.total_photos-12 ? slingDataInfo.offset +20 : 0;

						console.log("........offset ",slingDataInfo.offset)

                        	setSlingDataInfo(() => ({
							...slingDataInfo,
							slingacademyURL: `https://api.slingacademy.com/v1/sample-data/photos?offset=${
								newOffset
							}&limit=20`,
						}));
                        setSlingDataInfo((prevData) => ({
							...prevData,
                            
							offset: newOffset
						}));
					}}
				>
					NEXT
				</button>


				{/* ALL PHOTOS WILL DISPLAY HERE BY USING PhotoCard TAG */}

			</div>

			<div id="main">
				
				{slingDataInfo.isLoding ? (
					<div id="wait">PLEASE WAIT FOR DATA LODING........</div>
				) : (
					slingDataInfo.info.map((d) => {
						return <PhotoCard photoId={d.id} photoUrl={d.url} title={d.title} key={d.url} />;
					})
				)}
			</div>
		</div>
	);
}
// CODE FOR GENERATING RANDOM COLORS
function randomColorCode(){
	const colors=[0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']
	let hex='#';
	for(let i=0;i<6;i++)
	{
	   hex+=colors[Math.floor(Math.random()*colors.length)];
	}

	  return hex;
   }
export { HomePage,randomColorCode };