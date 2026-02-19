import { Component } from '@angular/core';
import { getApps, initializeApp } from 'firebase/app';
import {
  getRemoteConfig,
  fetchAndActivate,
  getBoolean,
  RemoteConfig,
} from 'firebase/remote-config';
import { environment } from '../environments/environment';
import { FeatureFlagsService } from './services/feature-flags.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  showCategoryFilter = true;

  constructor(private featureFlagsService: FeatureFlagsService) {
    this.initRemoteConfig();
  }

  private async initRemoteConfig(): Promise<void> {
    try {
      // Initialize Firebase app (only once)
      const app =
        getApps().length > 0 ? getApps()[0] : initializeApp(environment.firebase);

      const remoteConfig: RemoteConfig = getRemoteConfig(app);

      // Configuración para desarrollo: intervalo corto para probar cambios rápidamente
      if (!environment.production) {
        remoteConfig.settings.minimumFetchIntervalMillis = 10000; // 10 segundos en desarrollo
      }

      remoteConfig.defaultConfig = {
        show_category_filter: true,
      };

      // Forzar fetch y activación
      await fetchAndActivate(remoteConfig);

      const show = getBoolean(remoteConfig, 'show_category_filter');
      console.log('🔧 Remote Config - show_category_filter:', show);
      this.showCategoryFilter = show;
      this.featureFlagsService.setShowCategoryFilter(show);
    } catch (error) {
      console.error('❌ Error al inicializar Remote Config:', error);
      // En caso de fallo en Remote Config, usamos el valor por defecto
      this.showCategoryFilter = true;
      this.featureFlagsService.setShowCategoryFilter(true);
    }
  }
}
