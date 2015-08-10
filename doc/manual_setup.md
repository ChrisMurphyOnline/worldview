# Manual Setup

Download and install [Node.js](http://nodejs.org/) using the instructions on
their site.

Clone this repository:

```bash
git clone https://github.com/nasa-gibs/worldview.git
cd worldview
```

Select one of the following configuration repositories:

```bash
# Official EOSDIS configurations
git clone https://github.com/nasa-gibs/worldview-options-eosdis.git options

# Or a blank repository with only Corrected Reflectance and no branding
git clone https://github.com/nasa-gibs/worldview-options-template.git options
```

Now install a global version of [grunt](http://gruntjs.com/) using the
following command:

```bash
sudo npm install --global grunt-cli
```

Install the packages required for building:

```bash
npm install
```

Some python libraries are required. Install virtualenv to keep additional
libraries installed in a local directory:

```bash
sudo easy_install virtualenv==1.10.1
```

Setup a virtualenv and install dependencies:

```bash
virtualenv python
python/bin/pip install xmltodict
```

Start the build with:

```bash
grunt
```

The ``dist`` directory now contains ``site`` tar files that can be
can be uploaded and unpacked to a web server.

##Setting a Worldview development environment in Windows
Worldview may be setup on Windows with XAMPP. First install XAMPP, the default location is at C:\xampp. Clone the Worldview repo at C:\xampp\htdocs and then the configuration repo in Worldview.

Edit the httpd.conf file at &lt;xampp root&gt;\apache\conf to uncomment:

```bash
"LoadModule expires_module modules/mod_expires.so" 
"LoadModule filter_module modules/mod_filter.so"
"LoadModule deflate_module modules/mod_deflate.so"
```

Turn on xampp, and Worldview should be ready at "localhost/worldview/web"! If you encounter any code 500 errors, check the error log at &lt;xampp root&gt;\apache\logs