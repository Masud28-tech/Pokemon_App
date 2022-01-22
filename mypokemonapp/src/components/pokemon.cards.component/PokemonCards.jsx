import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScrol from 'react-infinite-scroll-component';

import pokemonLogo from '../../assests/pokemon-23.svg';
import CardItem from '../card-item.component/CardItem';
import { Spinner } from '../loading.component/Spinner';

class PokemonCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonsData: [],
            page: 1,
            pageSize: 6,
            totalPages: 66,
            isLoading: false,
            scrolling: false
        }
    }

    async componentDidMount() {
        await this.fetchPokemonsData();
        await this.fetchMorePokemonsData();
        // window.addEventListener('scroll', this.handleScroll);
    }

    // FETCHING POKEMON DATA
    fetchPokemonsData = async () => {
        this.setState({ isLoading: true })
        const pokemons = (
            await axios
                .get(`https://api.pokemontcg.io/v2/cards?${this.state.page}&pageSize=${this.state.pageSize}`)
        ).data;

        this.setState({
            pokemonsData: pokemons.data,
            isLoading: false
        })
    }

    // TO FETCH POKEMONS DATA ON SCROLLING
    fetchMorePokemonsData = async () => {
        this.setState({ page: this.state.page + 1, isLoading: true });
        const pokemons = (
            await axios
                .get(`https://api.pokemontcg.io/v2/cards?page=${this.state.page}&pageSize=${this.state.pageSize}`)
        ).data;

        this.setState({
            pokemonsData: this.state.pokemonsData.concat(pokemons.data),
            isLoading: false
        });
    }

    // handleScroll(event) {
    //     if (window.scrollY === 0 && this.state.scrolling === true) {
    //         this.setState({ scrolling: false });
    //     }
    //     else if (window.scrollY !== 0 && this.state.scrolling !== true) {
    //         this.setState({ scrolling: true });
    //         this.fetchMorePokemonsData();
    //     }
    // }

    render() {

        return (
            <InfiniteScrol
                dataLength={this.state.pokemonsData.length}
                next={this.fetchMorePokemonsData}
                hasMore={this.state.totalPages !== this.state.pokemonsData.length}
                loader={<Spinner />}
            >
                <div className='text-center'>
                    <div className='container text-center'>

                        <img src={pokemonLogo} alt="pokemon logo"
                            style={{ width: "40%", marginBottom: "50px" }}
                        />

                        <div className='row text-center'>
                            {this.state.pokemonsData
                                .map((pokemon) => {
                                    return <div className="col-md-4" key={pokemon.id}>
                                        <CardItem name={pokemon.name}
                                            HP={pokemon.hp}
                                            types={pokemon.types}
                                            imageUrl={pokemon.images.large}
                                            Attacks={pokemon.attacks}
                                        />
                                    </div>
                                })}
                        </div>
                    </div>


                {/* LOADING PAGES WITHOUT USING INFINITE SCROLL PACKAGE */}
                    {/* {this.state.isLoading && <Spinner />} */}

                    {/* <button className='btn btn-danger text-center m-4'
                    onClick={() => this.fetchMorePokemonsData()}
                    disabled={this.state.totalPages === this.state.pokemonsData.length}
                >
                    Load More!
                </button> */}
                </div>

            </InfiniteScrol>
        );
    }
}

export default PokemonCards;