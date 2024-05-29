import { goto } from '$app/navigation';

export const goToRandomArtist = () => {
	const id = Math.floor(Math.random() * 559) + 1;
	goto(`/artist/${id}`);
};
