import {
	resolve
} from 'path'
import {
	defineConfig
} from 'vite'

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				profile: resolve(__dirname, 'page/profile/index.html'),
				"actor_cart": resolve(__dirname, 'page/actor_cart/index.html'),
				"movie_cart": resolve(__dirname, 'page/cino_cart/index.html'),
			},
		},
	},
})