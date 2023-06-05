/* eslint-disable react/prop-types */
const PokemonCard = ({ pokemon }) => {
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-24 h-24"
                />
            </figure>
            <div className="card-body pt-3">
                <h2 className="card-title capitalize text-left">
                    {pokemon.name}
                </h2>
                <div className="grid grid-cols-1 gap-2 my-2">
                    {pokemon.stats.map((item) => (
                        <div
                            className="flex justify-between items-center gap-1"
                            key={item.stat.name}
                        >
                            <div className="text-xs text-left capitalize w-2/3">
                                {item.stat.name}
                            </div>
                            <progress
                                className="progress progress-primary w-56"
                                value={item.base_stat}
                                max="100"
                            ></progress>
                        </div>
                    ))}
                </div>
                <div className="flex justify-start w-full gap-2 capitalize">
                    {pokemon.types.map((item) => (
                        <div className="badge badge-ghost" key={item.slot}>
                            {item.type.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;
