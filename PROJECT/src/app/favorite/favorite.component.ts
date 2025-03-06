import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game/game.service'; 
import { Game } from '../shared/models/Game'; 
@Component({
  selector: 'app-favorite',
  standalone: false,
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent implements OnInit {
  favoriteGames: Game[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.favoriteGames = this.gameService.getFavoriteGames();
  }
  removeFromFavorites(game: Game): void {
    this.gameService.removeFromFavorites(game); 
    this.favoriteGames = this.gameService.getFavoriteGames(); 
  }
}