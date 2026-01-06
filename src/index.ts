export default {
  async fetch(request, env, ctx): Promise<Response> {
    const resource = new URL(request.url).searchParams.get("resource");
    if (resource === null) {
      return new Response('No resource requested', { status: 400 });
    }

    const email = resource.replace(/^(acct:)*@*/, "");

    return new Response(`{
      "subject": "acct:${email}",
      "links": [
        { "rel": "http://openid.net/specs/connect/1.0/issuer", "href": "${env.ISSUER_URL}"}
      ]
    }`);
  },
} satisfies ExportedHandler<Env>;
