// Bespoke.js
bespoke.from('article', [
<% if (useTheme) { %>    bespoke.themes.cube(),
<% } %><% if (bullets) { %>    bespoke.plugins.bullets('li, .bullet'),
<% } %><% if (backdrop) { %>    bespoke.plugins.backdrop(),
<% } %><% if (scale) { %>    bespoke.plugins.scale(),
<% } %><% if (hash) { %>    bespoke.plugins.hash(),
<% } %><% if (progress) { %>    bespoke.plugins.progress(),
<% } %><% if (forms) { %>    bespoke.plugins.forms(),
<% } %>    bespoke.plugins.keys(),   
    bespoke.plugins.touch()
]);
