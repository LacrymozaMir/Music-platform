// import MainLayot from '@/layouts/MainLayot';
// import { Button, Grid, TextField } from '@mui/material';
// import axios from 'axios';
// import { GetServerSideProps } from 'next';
// import { useRouter } from 'next/router';
// import React, { useState } from 'react'

// const TrackPage = ({serverTrack}) => {

//     const [track, setTrack] = useState(serverTrack);
//     const router = useRouter();
//   return (
//     <MainLayot>
//         <Button 
//             variant={'outlined'}
//             style={{fontSize: 32}}
//             onClick={() => router.push('/track')}
//         >
//             К списку
//         </Button>
//         <Grid container style={{margin: '20px 0'}}>
//             <img src={'http://localhost:5000/' + track.picture} width={200} height={200}/>
//             <div style={{margin: '20px 0'}}>
//                 <h1>{track.name}</h1>
//                 <h1>Исполнитель - {track.artist}</h1>
//                 <h1>Прослушиваний - {track.listens}</h1>
//             </div>
//         </Grid>
//         <h1>Лирика:</h1>
//         <p>{track.text}</p>
//         <h1>Комментарии</h1>
//         <Grid container>
//             <TextField
//                 label="Nickname"
//                 fullWidth
//             />
//             <TextField
//                 label="Comment"
//                 fullWidth
//                 multiline
//                 rows={4}
//             />
//             <Button>Отправить</Button>
//         </Grid>
//         <div>
//             {track.comments.map(comment=>
//                   <div>
//                     <div>Автор - {comment.username}</div>
//                     <div>Комментарий - {comment.text}</div>
//                   </div>  
//                 )}
//         </div>
//     </MainLayot>
//   )
// }

// export default TrackPage;

// export const getServerSideProps: GetServerSideProps = async({params}) => {
//     const response = await axios.get('http://localhost:5000/tracks/' + params.id)
//     return {
//         props: {
//             serverTrack: response.data
//         }
//     }
// }

// // export const getServerSideProps = wrapper.getServerSideProps((store) => async ({params}) => {
// //     const response =  await axios.get('http://localhost:5000/track/' + params)
// //     return {
// //                 props: {
// //                     track: response.data
// //                 }
// //             }
// // })