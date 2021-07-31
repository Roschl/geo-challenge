import { collection, addDoc, getFirestore } from "@firebase/firestore";

const db = getFirestore();

export const createGame = async (
  continents: string[] | null,
  map: string,
  maxRounds: number,
  userId: string
) => {
  try {
    const docRef = await addDoc(collection(db, "games"), {
      continents,
      id: (100000000).toString(36),
      isRunning: false,
      map,
      maxRounds,
      players: [
        {
          points: 0,
          userId
        }
      ],
      round: 0,
      startedAt: null
    });
    console.log(docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getGames = async () => {
  try {
    const games = collection(db, "games");
    return games;
  } catch (e) {
    console.log('Error fetching documents: ', e);
  }
}