import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game/game.service';
import { Game } from '../shared/models/Game';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];  
  searchQuery: string = '';  
  showAll: boolean = false;
  displayedGames: Game[] = [];


  constructor(private gameService: GameService) {}
  username: string | null = '';

  ngOnInit(): void {
    this.games = this.gameService.getGames();  
    this.displayedGames = this.games.slice(0, 3); 
    this.filteredGames = [...this.games]; 
    this.filteredGames = this.gameService.getGames();
    this.username = localStorage.getItem('username');
  }
  addToFavorites(game: Game): void {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // Avoid duplicates
    if (!favorites.some((fav: Game) => fav.id === game.id)) {
      favorites.push(game);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  filterGames(): void {
    if (this.searchQuery === '') {

      this.displayedGames = this.showAll ? this.games : this.games.slice(0, 3);
    } else {

      const filtered = this.gameService.getGames(this.searchQuery);
      this.displayedGames = this.showAll ? filtered : filtered.slice(0, 3);
    }
  }
  toggleShowMore(): void {
    this.showAll = !this.showAll;
    this.filterGames(); 
  }
}
