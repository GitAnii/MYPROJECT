import { Injectable } from '@angular/core';
import { Game } from '../../shared/models/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private favoriteGames: Game[] = []; 
  constructor() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favoriteGames = JSON.parse(storedFavorites);
    }
   }



  getGames(searchValue: string = ''): Game[] {
    const games: Game[] = [
      {
        id: 1,
        name: "OVERWATCH",
        price: 0,
        favorite: false,
   
        category: "shooter", // category is added here
        imageUrl: '/game-1.jpg'
      },
      {
        id: 2,
        name: "Valorant",
        price: 0,
        favorite: false,

        category: "shooter", // category is added here
        imageUrl: '/game-2.jpg'
      },
      {
        id: 3,
        name: "Elden Ring",
        price: 60,
        favorite: false,
  
        category: "adventure", 
        imageUrl: '/game-3.jpg'
      },
      {
        id: 4,
        name: "Counter-Strike",
        price: 0,
        favorite: false,
      
        category: "shooter", 
        imageUrl: '/game-4.jpg'
      },
      {
        id: 5,
        name: "Final Fantasy",
        price: 20,
        favorite: false,
 
        category: "adventure", 
        imageUrl: '/game-5.jpg'
      },
      {
        id: 6,
        name: "Bloodborne",
        price: 20,
        favorite: false,

        category: "adventure", 
        imageUrl: '/game-6.jpg'
      },
      {
        id:7,
        name:"The Last Of Us",
        price:59.99,
        favorite: false,
        category: "adventure",
        imageUrl: '/game-7.jpg'
      },
      {
        id:8,
        name:"Marvel rivals",
        price:0,
        favorite: false,
        category: "shooter",
        imageUrl: '/game-8.jpg'
      },
      {
        id:9,
        name:"Resident Evil",
        price:39.99,
        favorite: false,
        category: "adventure",
        imageUrl: '/game-9.jpg'
      },
    ];

    if (!searchValue) {
      return games;
    }

   
    const lowerSearchValue = searchValue.toLowerCase();
    return games.filter(game => game.name.toLowerCase().includes(lowerSearchValue) ||
      game.category.toLowerCase().includes(lowerSearchValue)
    );
  }
  addToFavorites(game: Game): void {
    if (!this.favoriteGames.includes(game)) {
      this.favoriteGames.push(game);
      game.favorite = true; 
    }
  }
  getFavoriteGames(): Game[] {

    return this.favoriteGames;
  }

  removeFromFavorites(game: Game): void {
    let favorites = this.getFavoriteGames();
    favorites = favorites.filter((fav: Game) => fav.id !== game.id);
    this.favoriteGames = favorites; 
    localStorage.setItem('favorites', JSON.stringify(favorites)); 
  }
  getGameById(id:number): Game | undefined{
    const games = this.getGames();
    return games.find(game => game.id ===id);
  }
}
