import json
import requests
from xml.etree.ElementTree import Element, SubElement, tostring
from xml.dom import minidom

# Fetch the JSON data
response = requests.get('https://api.xtr.my.id/api/sitemap/')
data = response.json()

# Create the root element
root = Element('urlset')

# Iterate over the games and create <url> elements
for game in data['games']:
    url = SubElement(root, 'url')

    # Create <loc> element
    loc = SubElement(url, 'loc')
    loc.text = f"https://xtr.my.id/detail/{game['id']}"

    # Create <lastmod> element
    lastmod = SubElement(url, 'lastmod')
    lastmod.text = game['createdAt']

# Create a formatted XML string
xml_string = minidom.parseString(tostring(root)).toprettyxml(indent="\t")

# Write the XML string to a file
with open('public/sitemap.xml', 'w') as file:
    file.write(xml_string)

print("Sitemap generated successfully.")