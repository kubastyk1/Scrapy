import scrapy
import re
import json

actorDict = {};
jsonData = [];

class QuotesSpider(scrapy.Spider):
    name = "quotes"

    def start_requests(self):
        urls = [
            'https://www.imdb.com/chart/top/?ref_=nv_mv_250',
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        links = []
        for link in response.css('a::attr(href)').extract():
            if "/title/tt" in link:
                links.append(link+'fullcredits')

        for href in links:
            yield response.follow(href, self.parse_actors)

    def parse_actors(self, response):
        actorNames = response.xpath('//a[contains(@href,"/name/nm")]/text()').getall()
        for actor in actorNames:
            global actorDict;
            #self.log(actorDict)
            if actor in actorDict:
                actorDict[actor] += 1;
            else:
                actorDict[actor] = 1;
        actorList = [];
        for key, value in actorDict.items():
            tmp = [key, value]
            actorList.append(tmp);
        actorList.sort(key=lambda x: x[1]);
        jsonf = open('castJson.json', 'w');
        f = open("full_cast.txt", "w");
        for actor in actorList[::-1]:
            formattedName = '{0: <16}'.format(" ".join(actor[0].split()))
            f.write(formattedName + " :" + str(actor[1])+'\n')
            jsonData.append({formattedName: actor[1]})
        json.dump(jsonData, jsonf);
        jsonf.close();
        f.close();




# scrapy crawl quotes
