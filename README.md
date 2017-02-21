# Proxy

A proxy to bind your apps to an API during development.

## Install

```sh
npm install @educastellano/proxy --save-dev
```

## Usage

Useful as a script in your package.json:

```
{
    "start": "proxy --url http://mytestserver.com --static app"
}
```

**CLI Options**

```
--host <host>      // Host to bind (default 127.0.0.1)
--port <port>      // Port to bind (default 8080)
--url <url>        // Remote url 
--static <folder>  // Folder for static files
```

## Changelog

### 1.0.0

* Initial release



