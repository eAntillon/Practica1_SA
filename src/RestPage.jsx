import { useAsync } from '@react-hookz/web';
import { useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';

const RestPage = () => {
    const [page, setPage] = useState(1);

    const [limit] = useState(12);

    const [state, actions] = useAsync(async () => {
        const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
                (page - 1) * limit
            }}`
        );
        const data = await res.json();
        if (data.results.length > 0) {
            const pokemon = await Promise.all(
                data.results.map(async (pokemon) => {
                    const res = await fetch(pokemon.url);
                    const data = await res.json();
                    return data;
                })
            );
            console.log({ pokemon });
            return { pokemon };
        }
        return [];
    }, []);

    useEffect(() => {
        if (state.status === 'loading') return;
        actions.execute();
    }, [actions, page, limit]);

    return (
        <div className="w-full md:max-w-screen-xl p-3 md:p-5">
            <div>
                <h1 className="text-3xl font-bold mb-3">PokeAPI</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    
                    {state.error && <div>Error: {state.error.message}</div>}
                    {state.result && state.result.pokemon && (
                        <>
                            {state.result.pokemon.map((pokemon) => (
                                <PokemonCard
                                    key={pokemon.id}
                                    pokemon={pokemon}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
            <div className="w-full flex justify-center">
                <div className="join mt-4">
                    <button
                        className="join-item btn btn-ghost"
                        onClick={() => setPage(page - 1 < 1 ? 1 : page - 1)}
                        disabled={state.status === 'loading'}
                    >
                        «
                    </button>
                    <button className="join-item btn btn-ghost">
                        Page {page}
                    </button>
                    <button
                        className="join-item btn btn-ghost"
                        onClick={() => setPage(page + 1 < 1 ? 1 : page + 1)}
                        disabled={state.status === 'loading'}
                    >
                        »
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RestPage;
