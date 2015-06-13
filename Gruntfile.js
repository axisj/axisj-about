module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			docs: {
				options : {
					stripBanners: true,
					separator   : '\n\n',
					banner      : '<!DOCTYPE html>\n<!-- \n' + ' <%= pkg.name %> - v<%= pkg.version %> \n' + ' publish date : <%= grunt.template.today("yyyy-mm-dd") %> \n' + '-->\n',
					separator   : '\n\n<!-- split -->\n\n'
				}, files: {
					'docs/index.html'   : ['docs/layout/head.html', 'docs/layout/visual-dom.html', 'docs/axisj/intro/*.html', 'docs/layout/bottom.html'],
					'docs/chapter1.html': ['docs/layout/head.html', 'docs/layout/visual-dom.html', 'docs/axisj/chapter1/*.html', 'docs/layout/bottom.html'],
					'docs/chapter2.html': ['docs/layout/head.html', 'docs/layout/visual-dom.html', 'docs/axisj/chapter2/*.html', 'docs/layout/bottom.html']
				}
			}
		},
		watch: {
			docs: {
				files: ['docs/axisj/intro/*.html','docs/axisj/chapter1/*.html','docs/axisj/chapter2/*.html'],
				tasks: ['concat:docs', 'replace:docs', 'replace:url']
			},
			sample_doc: {
				files: ['docs/css/*.scss'],
				tasks: ['sass:sample_doc']
			}
		},
		sass: {
			options: {
				sassDir: 'src/scss',
				cssDir: 'src/css',
				noLineComments: true,
				outputStyle:'nested',
				spawn: false
			},
			sample_doc: {
				files: {
					'docs/css/app.css': 'docs/css/app.scss'
				}
			}
		},
		replace: {
			docs: {
				src: ['docs/index.html','docs/chapter1.html','docs/chapter2.html'],
				overwrite: true,                 // overwrite matched source files
				options: {
					processTemplates: false
				},
				replacements: [{
					from: /<pre[^>]*>([^<]*(?:(?!<\/?pre)<[^<]*)*)<\/pre\s*>/gi,
					to: function (matchedWord, index, fullText, regexMatches) {
						if(regexMatches.join('').substr(0, 9) == "$noscript"){
							return '<pre class="prettyprint linenums">'+ regexMatches.join('').replace(/\$noscript\$/g, "").replace(/</g, "&lt;") +'</pre>';
						}else{
							return '<pre class="prettyprint linenums">'+ regexMatches.join('').replace(/</g, "&lt;") +'</pre>' + '<h4>Result</h4>' + regexMatches.join('');
						}
					}
				}]
			},
			url: {
				src: ['docs/index.html','docs/chapter1.html','docs/chapter2.html'],
				overwrite: true,                 // overwrite matched source files
				options: {
					processTemplates: false
				},
				replacements: [{
					from: /<url[^>]*>([^<]*(?:(?!<\/?url)<[^<]*)*)<\/url\s*>/gi,
					to: function (matchedWord, index, fullText, regexMatches) {
							return '<a href="' + regexMatches.join('') + '" target="_blank">'+ regexMatches.join('') +'</a>';
					}
				}]
			}
		}
	});
	//grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('docs', ['concat:docs','replace:docs','replace:url','watch:docs']);
	grunt.registerTask('sass-make-doc', ['sass:sample_doc','watch:sample_doc']);
};