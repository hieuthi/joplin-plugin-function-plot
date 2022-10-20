module.exports = {
  default: function(context) {
    return {
      plugin: function (markdownIt, _options) {
        const defaultRender = markdownIt.renderer.rules.fence || function(tokens, idx, options, env, self) {
          return self.renderToken(tokens, idx, options, env, self);
        };
        markdownIt.renderer.rules.fence = function(tokens, idx, options, env, self) {
          const token = tokens[idx];
          if (token.info !== 'function-plot') return defaultRender(tokens, idx, options, env, self);
          try {
            var contentHtml = markdownIt.utils.escapeHtml(token.content);
          } catch (e) {
            var contentHtml = {};
          }
          return `
            <div class="joplin-editable">
              <div class="function-plot-view">${contentHtml}</div>
            </div>
          `;
        };
      },
      assets: function () {
        return [
          { name: 'function-plot.js' },
          { name: 'functionPlotView.js' }]
      }
    }
  }
}