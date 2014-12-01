using System.Web.Http;
using DemoWorkerRole;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof (Startup))]

namespace DemoWorkerRole
{
	public class Startup
	{
		public void Configuration(IAppBuilder app)
		{
			var config = new HttpConfiguration();

			// Routing
			config.Routes.MapHttpRoute(
				"Default",
				"api/{controller}/{action}/{id}",
				new {id = RouteParameter.Optional});

			//Configure WebAPI
			app.UseWebApi(config);
		}
	}
}