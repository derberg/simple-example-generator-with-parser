const Generator = require('@asyncapi/generator');
const path = require('path');
const parser = require('@asyncapi/parser');
const sourceString =
  '{"asyncapi":"2.0.0","info":{"title":"Account Service","version":"1.0.0","description":"This service is in charge of processing user signups"},"channels":{"user/signedup":{"subscribe":{"message":{"$ref":"#/components/messages/UserSignedUp"}}}},"components":{"messages":{"UserSignedUp":{"payload":{"type":"object","properties":{"displayName":{"type":"string","description":"Name of the user"},"email":{"type":"string","format":"email","description":"Email of the user"}}}}}}}';

const DEFAULT_TEMPLATE = '@asyncapi/html-template@0.14.0';
const DEFAULT_OUTPUT = 'output';

async function run() {
  try { 
    const absoluteOutputPath = path.resolve(__dirname, DEFAULT_OUTPUT);

    const generator = new Generator(DEFAULT_TEMPLATE, absoluteOutputPath, { 
      forceWrite: true
    });
    
    const parsed = await parser.parse(sourceString);    
    console.log("Constructor", parsed.constructor.name)
    await generator.generate(parsed);

  } catch (e) {
    console.log(e);
  }
}
  
run();
