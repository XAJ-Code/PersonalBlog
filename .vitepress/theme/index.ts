import DefaultTheme from 'vitepress/theme'
import ImageViewer from '../../src/components/imageViewr.vue'
import './custom.css';
export default {
    ...DefaultTheme,
    enhanceApp({ app }: any) {
        app.component('ImageViewer', ImageViewer)

    }
}