<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns="http://www.example.com/moviesNamespace"
    xmlns:xs="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:ns="http://www.example.com/moviesNamespace">
    <xsl:output method="html" indent="yes"/>

  <!-- Template for matching the  element -->
  <xsl:template match="/">
    <html>
      <head>
        <title>Movie List</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>Movie List</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Language</th>
              <th>Genre</th>
              <th>Length</th>
              <th>IMDb Rating</th>
              <th>Age Rating</th>
              <th>Story</th>
              <th>Director</th>
              <th>Writer</th>
            </tr>
          </thead>
          <tbody>
            <!-- Iterate over each row -->
            <xsl:for-each select="//ns:movie">
              <tr>
                <td><xsl:value-of select="ns:name" /></td>
                <td><xsl:value-of select="ns:language" /></td>
                <td><xsl:value-of select="ns:genre" /></td>
                <td><xsl:value-of select="ns:length" /></td>
                <td><xsl:value-of select="ns:imdb_rating" /></td>
                <td><xsl:value-of select="ns:age_rating" /></td>
                <td><xsl:value-of select="ns:story" /></td>
                <td><xsl:value-of select="ns:director" /></td>
                <td><xsl:value-of select="ns:writer" /></td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
